import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const core = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');
const effects = readFileSync(new URL('../../dist/effects/index.css', import.meta.url), 'utf8');
test('Collapse animates native and controlled height both ways with immediate inert closing', async ({page}) => {
  await fixture(page, `<details class="collapse" id="native"><summary class="collapse-trigger">Native</summary><div class="collapse-content"><div style="height:180px">Content</div></div></details><div class="collapse" id="controlled"><button class="collapse-trigger" aria-expanded="false">Controlled</button><div class="collapse-content" hidden inert><div style="height:180px"><button>Inside</button></div></div></div>`);
  await page.locator('#native summary').click();
  await page.waitForTimeout(100);
  const mid=await page.locator('#native').evaluate(el=>el.getBoundingClientRect().height);
  await page.waitForTimeout(300);
  const expanded=await page.locator('#native').evaluate(el=>el.getBoundingClientRect().height);
  expect(mid).toBeLessThan(expanded);
  await page.locator('#native summary').click();
  await page.waitForTimeout(100);
  const closing=await page.locator('#native').evaluate(el=>el.getBoundingClientRect().height);
  expect(closing).toBeGreaterThan(50);
  expect(closing).toBeLessThan(expanded);
  await page.locator('#controlled').evaluate(el=>{el.classList.add('collapse-open'); const panel=el.querySelector<HTMLElement>('.collapse-content')!; panel.hidden=false;panel.inert=false;});
  await page.waitForTimeout(100);
  const controlledMid=await page.locator('#controlled .collapse-content').evaluate(el=>el.getBoundingClientRect().height);
  await page.waitForTimeout(300);
  const controlledFull=await page.locator('#controlled .collapse-content').evaluate(el=>el.getBoundingClientRect().height);
  expect(controlledMid).toBeGreaterThan(0); expect(controlledMid).toBeLessThan(controlledFull);
  await page.locator('#controlled').evaluate(el=>{el.classList.remove('collapse-open'); const panel=el.querySelector<HTMLElement>('.collapse-content')!; panel.hidden=true;panel.inert=true;});
  await page.waitForTimeout(100);
  const controlledClosing=await page.locator('#controlled .collapse-content').evaluate(el=>el.getBoundingClientRect().height);
  expect(controlledClosing).toBeGreaterThan(0); expect(controlledClosing).toBeLessThan(controlledFull);
  await page.waitForTimeout(300);
  await expect(page.locator('#controlled .collapse-content')).toBeHidden();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('#native summary').click();
  expect(await page.locator('#native').evaluate(el=>getComputedStyle(el,'::details-content').transitionDuration)).toBe('0s');
});
test('Chat curved tails follow start/end in both directions and preserve variants', async ({page}, testInfo) => {
  for (const dir of ['ltr', 'rtl']) {
    await fixture(page, ['start','end'].map(side => ['','primary','secondary','tertiary','info','success','warning','error'].map(role => `<div class="chat chat-${side}"><div class="chat-bubble ${role ? `chat-bubble-${role}` : ''}">${role || 'Default'} bubble</div></div>`).join('')).join(''), 'sunshine', dir);
    const bubbles=page.locator('.chat-bubble');
    for (const bubble of await bubbles.all()) {
      const tail=await bubble.evaluate(el => { const s=getComputedStyle(el,'::before'); return {mask:s.maskImage,top:s.top,bg:s.backgroundColor,body:getComputedStyle(el).backgroundColor}; });
      expect(tail.mask).toContain('radial-gradient');
      expect(tail.top).toBe('0px');
      expect(tail.bg).toBe(tail.body);
    }
    await page.screenshot({path:testInfo.outputPath(`chat-tails-${dir}.png`),fullPage:true});
  }
});
async function fixture(page: Page, markup: string, theme = 'sunshine', dir = 'ltr') {
  await page.setContent(`<html lang="en" data-theme="${theme}" dir="${dir}"><head><title>Data Display</title><style>${core}\n${effects}</style></head><body><main>${markup}</main></body></html>`);
}

for (const name of ['accordion', 'collapse']) {
  const item = name === 'accordion' ? 'accordion-item' : 'collapse';
  const trigger = name === 'accordion' ? 'accordion-header' : 'collapse-trigger';
  test(`${name}: native conflicting aliases, nested state and exclusive group`, async ({ page }) => {
    await fixture(page, `<details id="outer" class="${item} open show collapse-open collapse-closed" name="group">
      <summary class="${trigger}">Outer</summary><div class="${name}-content"><div class="${name === 'accordion' ? 'accordion-body' : 'collapse-inner'}">
      <button id="inside">Inside</button><details id="nested" class="${item}"><summary class="${trigger}">Nested</summary><div class="${name}-content"><button id="nested-control">Nested control</button></div></details></div></div></details>
      <details id="other" class="${item}" name="group"><summary class="${trigger}">Other</summary><div class="${name}-content"><p>Other content</p></div></details>`);
    await expect(page.locator('#inside')).toBeHidden();
    await page.locator('#outer > summary').click();
    await expect(page.locator('#inside')).toBeVisible();
    await expect(page.locator('#nested-control')).toBeHidden();
    await page.locator('#nested > summary').click();
    await expect(page.locator('#nested-control')).toBeVisible();
    await page.locator('#other > summary').click();
    await expect(page.locator('#inside')).toBeHidden();
    await expect(page.locator('#other')).toHaveAttribute('open', '');
    await page.locator('#outer > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#inside')).toBeVisible();
  });
}

test('controlled disclosure synchronizes aliases, ARIA, hidden/inert and focus', async ({ page }) => {
  await fixture(page, `<div class="accordion"><div class="accordion-item" id="item"><button class="accordion-header" id="trigger" aria-expanded="false" aria-controls="panel">Toggle panel</button><div class="accordion-content" id="panel" hidden inert><div class="accordion-body"><button id="control">Panel control</button></div></div></div></div><button id="next">Next</button>`);
  await page.evaluate(() => {
    const trigger = document.getElementById('trigger')!;
    const panel = document.getElementById('panel')!;
    const set = (expanded: boolean) => {
      if (!expanded && panel.contains(document.activeElement)) trigger.focus();
      trigger.setAttribute('aria-expanded', String(expanded));
      document.getElementById('item')!.classList.toggle('open', expanded);
      panel.hidden = !expanded; panel.inert = !expanded;
    };
    trigger.addEventListener('click', () => set(trigger.getAttribute('aria-expanded') !== 'true'));
    (window as any).closePanel = () => set(false);
  });
  await page.locator('#trigger').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#next')).toBeFocused();
  await page.locator('#trigger').click();
  await expect(page.locator('#trigger')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('#control')).toBeFocused();
  await page.evaluate(() => (window as any).closePanel());
  await expect(page.locator('#trigger')).toBeFocused();
  await expect(page.locator('#control')).toBeHidden();
  await expect(page.locator('#panel')).toHaveAttribute('inert', '');
});

test('controlled exclusive groups synchronize siblings without selecting nested items', async ({page}) => {
  await fixture(page, `<div class="accordion" id="group">${[0,1].map(i=>`<div class="accordion-item"><button class="accordion-header" aria-expanded="false" aria-controls="panel-${i}">Section ${i}</button><div class="accordion-content" id="panel-${i}" hidden inert><div class="accordion-body">Content ${i}<div class="accordion"><div class="accordion-item open" id="nested-${i}"><button class="accordion-header">Nested trigger</button><div class="accordion-content"><div class="accordion-body">Nested content</div></div></div></div></div></div></div>`).join('')}</div>`);
  await page.evaluate(()=>{
    const group=document.getElementById('group')!;
    const set=(item:Element,expanded:boolean)=>{
      const trigger=item.querySelector<HTMLElement>(':scope > .accordion-header')!;
      const panel=item.querySelector<HTMLElement>(':scope > .accordion-content')!;
      if(!expanded&&panel.contains(document.activeElement)) trigger.focus();
      trigger.setAttribute('aria-expanded',String(expanded));item.classList.toggle('open',expanded);
      panel.hidden=!expanded;panel.inert=!expanded;
    };
    group.querySelectorAll(':scope > .accordion-item').forEach(item=>{
      item.querySelector(':scope > button')!.addEventListener('click',()=>{
        const expanded=!item.classList.contains('open');
        if(expanded) group.querySelectorAll(':scope > .accordion-item').forEach(other=>{if(other!==item)set(other,false);});
        set(item,expanded);
      });
    });
  });
  await page.getByRole('button',{name:'Section 0',exact:true}).click();
  await page.getByRole('button',{name:'Section 1',exact:true}).click();
  await expect(page.locator('#panel-0')).toBeHidden();
  await expect(page.locator('#panel-1')).toBeVisible();
  await expect(page.locator('#nested-0')).toHaveClass('accordion-item open');
  await expect(page.locator('#panel-0')).toHaveAttribute('inert','');
});

for(const dir of ['ltr','rtl']) {
  test(`Timeline directional layouts and narrow alternate fallback: ${dir}`,async({page})=>{
    await fixture(page, `<ol class="timeline timeline-right"><li class="timeline-item"><span class="timeline-marker" aria-hidden="true"></span><div class="timeline-content">End aligned</div></li></ol><ol class="timeline timeline-alternate">${[1,2].map(i=>`<li class="timeline-item"><span class="timeline-marker" aria-hidden="true"></span><div class="timeline-content">Step ${i}</div></li>`).join('')}</ol><ol class="timeline timeline-horizontal">${[1,2,3,4].map(i=>`<li class="timeline-item"><span class="timeline-marker" aria-hidden="true"></span><div class="timeline-content">Step ${i}</div></li>`).join('')}</ol>`, 'sunshine',dir);
    expect(await page.locator('.timeline-right').evaluate(el=>getComputedStyle(el,'::before').insetInlineEnd)).toBe('20px');
    await page.setViewportSize({width:375,height:800});
    for(const marker of await page.locator('.timeline-alternate .timeline-marker').all()) expect(await marker.evaluate(el=>getComputedStyle(el).transform)).toBe('none');
    expect(await page.locator('.timeline-alternate').evaluate(el=>getComputedStyle(el,'::before').transform)).toBe('none');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    expect(await page.locator('.timeline-horizontal').evaluate(el=>el.scrollWidth>el.clientWidth)).toBe(true);
  });
}

for (const variant of ['', 'collapse-fade', 'collapse-slide', 'collapse-horizontal', 'collapse-horizontal-fixed', 'collapse-maxheight']) {
  test(`Collapse deterministic controlled/native precedence: ${variant || 'base'}`, async ({ page }) => {
    await fixture(page, `<div id="controlled" class="collapse ${variant} collapse-open collapse-closed show"><button class="collapse-trigger">Trigger</button><div class="collapse-content"><div><button id="control">Control</button></div></div></div>
      <details open id="native" class="collapse ${variant} collapse-closed"><summary class="collapse-trigger">Native trigger</summary><div class="collapse-content"><div><button id="native-control">Native control</button></div></div></details>`);
    await expect(page.locator('#control')).toBeHidden();
    await expect(page.locator('#native-control')).toBeVisible();
    await page.locator('#controlled').evaluate(el => el.classList.remove('collapse-closed'));
    await expect(page.locator('#control')).toBeVisible();
    expect(await page.locator('#control').evaluate(el => getComputedStyle(el.parentElement!).opacity)).not.toBe('0');
  });
}

test('selected Table rows preserve background during hover', async ({ page }) => {
  await fixture(page, `<table class="table table-hover table-zebra"><caption>Deployments</caption><tbody><tr class="selected"><th scope="row">Primary</th><td>Ready</td></tr></tbody></table>`);
  const row = page.locator('tr');
  const background = await row.evaluate(el => getComputedStyle(el).backgroundColor);
  await row.hover();
  expect(await row.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(background);
});

test('new semantic color modifiers win over their base styles in every shipped theme', async({page})=>{
  const roles=['primary','secondary','tertiary','info','success','warning','error'];
  for(const theme of ['sunshine','moonlight','ocean','forest']) {
    await fixture(page, roles.map(role=>`<span style="color:var(--color-${role})" id="reference-${role}"></span>${['carousel','countdown','diff','kbd'].map(name=>`<div class="${name} ${name}-${role}" id="${name}-${role}">Text</div>`).join('')}<div class="stat stat-${role}"><span class="stat-value" id="stat-${role}">42</span></div>`).join(''),theme);
    for(const role of roles) {
      const color=await page.locator(`#reference-${role}`).evaluate(el=>getComputedStyle(el).color);
      for(const name of ['carousel','countdown','diff','kbd','stat']) expect(await page.locator(`#${name}-${role}`).evaluate(el=>getComputedStyle(el).color)).toBe(color);
    }
  }
});

test('Carousel native keyboard scrolling, variable sizes and nested controls', async ({ page }) => {
  await fixture(page, `<div class="carousel carousel-center" tabindex="0" aria-label="Projects" style="width:320px">${[280,240,300].map((width,i)=>`<article class="carousel-item card" style="width:${width}px"><div class="card-body"><h2 class="card-title">Project ${i}</h2><button id="project-${i}" class="btn">Open ${i}</button></div></article>`).join('')}</div>`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.carousel').focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => page.locator('.carousel').evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await page.locator('#project-2').focus();
  await expect(page.locator('#project-2')).toBeFocused();
  await page.locator('.carousel').evaluate(el=>el.classList.add('carousel-vertical'));
  expect(await page.locator('.carousel').evaluate(el=>getComputedStyle(el).scrollSnapType)).toBe('block mandatory');
});

test('Diff range updates reveal, endpoints, RTL and print expose both layers', async ({ page }) => {
  await fixture(page, `<figure class="diff" id="diff" aria-label="Before and after"><div class="diff-before">Before</div><div class="diff-after">After</div></figure><label for="range">Reveal before</label><input id="range" type="range" min="0" max="100" value="50">`);
  await page.evaluate(() => document.getElementById('range')!.addEventListener('input', e => document.getElementById('diff')!.style.setProperty('--diff-position', `${(e.target as HTMLInputElement).value}%`)));
  await page.locator('#range').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('#range')).toHaveValue('0');
  expect(await page.locator('.diff-before').evaluate(el=>getComputedStyle(el).clipPath)).toContain('100%');
  await page.keyboard.press('End');
  await expect(page.locator('#range')).toHaveValue('100');
  await page.locator('html').evaluate(el=>el.dir='rtl');
  await page.keyboard.press('Home');
  expect(await page.locator('.diff-before').evaluate(el=>getComputedStyle(el).clipPath)).toContain('0px 0px 0px 100%');
  await page.emulateMedia({ media: 'print' });
  expect(await page.locator('.diff-before').evaluate(el=>getComputedStyle(el).clipPath)).toBe('none');
  const left = await page.locator('.diff-before').boundingBox();
  const right = await page.locator('.diff-after').boundingBox();
  expect(left!.x).not.toBe(right!.x);
});

test('optional effects provide rotating aura, directional tilt, hover gallery and 2-6 item text rotation', async ({ page }) => {
  await fixture(page, `<div class="aura aura-rainbow aura-lg" id="aura"><button class="btn">Highlighted action</button></div>
    <a class="hover-3d" id="tilt" href="#target"><div class="card">Directional card</div>${'<span></span>'.repeat(8)}</a>
    <figure class="hover-gallery" id="gallery"><img alt="Lake" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><img alt="Sky" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><img alt="Forest" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><img alt="Sunset" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></figure>
    <p aria-label="Build accessible resilient thoughtful interfaces">Build <span class="text-rotate" aria-hidden="true"><span id="rotator"><span>accessible</span><span>resilient</span><span>thoughtful</span></span></span> interfaces</p>
    <span class="text-rotate" id="six" aria-hidden="true"><span><span>Design</span><span>Develop</span><span>Deploy</span><span>Scale</span><span>Maintain</span><span>Repeat</span></span></span>`);

  expect(await page.locator('#aura').evaluate(el => getComputedStyle(el).paddingTop)).not.toBe('0px');
  expect(await page.locator('#aura').evaluate(el => getComputedStyle(el, '::before').backgroundImage)).toContain('conic-gradient');
  expect(await page.locator('#aura').evaluate(el => getComputedStyle(el, '::before').animationName)).toBe('dm-aura-spin');

  const tiltMotion = await page.locator('#tilt').evaluate(el => {
    const content = el.firstElementChild!;
    const contentStyle = getComputedStyle(content);
    const shineStyle = getComputedStyle(content, '::before');
    return {
      rootProperty: getComputedStyle(el).transitionProperty,
      rootDuration: getComputedStyle(el).transitionDuration,
      contentProperty: contentStyle.transitionProperty,
      contentDuration: contentStyle.transitionDuration,
      shineProperty: shineStyle.transitionProperty,
      shineDuration: shineStyle.transitionDuration,
    };
  });
  expect(tiltMotion.rootProperty).toContain('filter');
  expect(tiltMotion.rootDuration).toContain('0.4s');
  expect(tiltMotion.contentProperty).toContain('scale');
  expect(tiltMotion.contentDuration).toContain('0.5s');
  expect(tiltMotion.shineProperty).toContain('translate');
  expect(tiltMotion.shineDuration).toContain('0.4s');

  await page.locator('#tilt > :nth-child(2)').hover();
  const firstTransform = await page.locator('#tilt > :first-child').evaluate(el => getComputedStyle(el).transform);
  expect(firstTransform).not.toBe('none');
  await page.locator('#tilt > :nth-child(9)').hover();
  const oppositeTransform = await page.locator('#tilt > :first-child').evaluate(el => getComputedStyle(el).transform);
  expect(oppositeTransform).not.toBe(firstTransform);
  await page.locator('#tilt').click();
  expect(await page.evaluate(() => location.hash)).toBe('#target');

  await page.locator('#gallery > :nth-child(2)').hover();
  await expect.poll(() => page.locator('#gallery > :nth-child(2)').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  expect(await page.locator('#gallery > :first-child').evaluate(el => getComputedStyle(el).opacity)).toBe('0');
  await page.locator('#gallery > :nth-child(4)').hover();
  await expect.poll(() => page.locator('#gallery > :nth-child(4)').evaluate(el => getComputedStyle(el).opacity)).toBe('1');

  expect(await page.locator('#rotator').evaluate(el => getComputedStyle(el).animationName)).toBe('dm-text-rotate-3');
  expect(await page.locator('#six > span').evaluate(el => getComputedStyle(el).animationName)).toBe('dm-text-rotate-6');
  await page.locator('#rotator').hover();
  expect(await page.locator('#rotator').evaluate(el => getComputedStyle(el).animationPlayState)).toBe('paused');

  await page.emulateMedia({ reducedMotion:'reduce' });
  expect(await page.locator('#aura').evaluate(el => getComputedStyle(el, '::before').animationName)).toBe('none');
  expect(await page.locator('#tilt > :first-child').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  expect(await page.locator('#rotator').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
});

for (const theme of ['sunshine','moonlight','ocean','forest']) {
  for (const dir of ['ltr','rtl']) {
    test(`presentation: ${theme}, ${dir}, narrow/long content, accessible names`, async ({ page }, testInfo) => {
      await page.setViewportSize({width:375,height:800});
      await fixture(page, `<h1>Data Display</h1><section aria-label="Statistics"><dl class="stats stats-responsive"><div class="stat"><dt class="stat-title">${'LongLabel'.repeat(10)}</dt><dd class="stat-value">12345678901234567890</dd><dd class="stat-desc">Last day</dd></div><div class="stat"><dt class="stat-title">Health</dt><dd class="stat-value">98%</dd></div></dl></section>
      <p><span class="badge badge-soft badge-success">Operational</span> <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd></p><div class="avatar avatar-ring avatar-status-online"><span class="avatar-placeholder">LM</span></div>
      <div class="chat chat-start"><div class="chat-bubble"><a href="#report">${'long-link'.repeat(30)}</a><pre tabindex="0" aria-label="Code sample">${'code'.repeat(100)}</pre></div></div>
      <ol class="timeline"><li class="timeline-item"><span class="timeline-marker" aria-hidden="true"></span><div class="timeline-content"><h2 class="timeline-title">Ready</h2><p>${'LongDescription'.repeat(10)}</p></div></li></ol>`,theme,dir);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
      const result = await new AxeBuilder({page}).analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({path:testInfo.outputPath(`${theme}-${dir}.png`)});
      const stats = await page.locator('.stat').all();
      const first = await stats[0].boundingBox(); const second = await stats[1].boundingBox();
      expect(second!.y).toBeGreaterThan(first!.y);
    });
  }
}
