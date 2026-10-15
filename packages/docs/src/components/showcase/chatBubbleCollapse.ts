const cleanups = new Set<() => void>();

export function initChatBubbleCollapse(bubble: HTMLElement) {
  if (bubble.dataset.chatCollapseInitialized) return;
  bubble.dataset.chatCollapseInitialized = 'true';
  const content = bubble.querySelector<HTMLElement>(':scope > .chat-bubble-content')!;
  const toggle = bubble.querySelector<HTMLButtonElement>(':scope > .chat-bubble-toggle')!;

  function setExpanded(expanded: boolean) {
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show less' : 'Show more';
  }

  function measure() {
    const lineHeight = Number.parseFloat(getComputedStyle(content).lineHeight);
    const overflows = content.scrollHeight > lineHeight * 6 + 1;
    if (!overflows) {
      if (document.activeElement === toggle) content.focus();
      setExpanded(false);
    }
    toggle.hidden = !overflows;
  }

  const onClick = () => setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
  toggle.addEventListener('click', onClick);
  const resize = new ResizeObserver(measure);
  resize.observe(content);
  const mutation = new MutationObserver(measure);
  mutation.observe(content, { childList: true, characterData: true, subtree: true });
  measure();

  const cleanup = () => {
    resize.disconnect();
    mutation.disconnect();
    toggle.removeEventListener('click', onClick);
    delete bubble.dataset.chatCollapseInitialized;
    cleanups.delete(cleanup);
  };
  cleanups.add(cleanup);
  return cleanup;
}

document.addEventListener('astro:before-swap', () => {
  for (const cleanup of cleanups) cleanup();
  cleanups.clear();
});
