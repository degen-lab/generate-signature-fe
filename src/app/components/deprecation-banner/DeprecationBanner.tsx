const SIP_045_URL =
  "https://github.com/stacksgov/sips/blob/main/sips/sip-045/sip-045-pox-5-bitcoin-staking.md";

export const DeprecationBanner = () => {
  return (
    <div className="w-full px-4 mb-6">
      <div
        role="alert"
        className={`
        mx-auto
        max-w-5xl
        flex
        flex-row
        items-start
        gap-3
        rounded-xl
        border
        border-amber-400 dark:border-amber-500/60
        bg-amber-50 dark:bg-amber-500/10
        text-amber-900 dark:text-amber-100
        p-4
      `}
      >
        <svg
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div className="flex flex-col gap-1 text-sm md:text-base">
          <p className="font-semibold">This tool is deprecated.</p>
          <p>
            PoX-5 replaced PoX-4 in the Epoch 4.0 hard fork at Bitcoin block
            960,230. The PoX-4 signer signatures generated here are no longer
            valid for stacking.
          </p>
          <a
            href={SIP_045_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit font-semibold underline underline-offset-2 hover:text-primary"
          >
            Read SIP-045: PoX-5 Bitcoin Staking
          </a>
        </div>
      </div>
    </div>
  );
};
