interface Props {
  isGenerating: boolean;
  onClick: () => void;
}

export default function DownloadButton({ isGenerating, onClick }: Props) {
  return (
    <div className="flex justify-center pb-4 step-enter">
      <button
        onClick={onClick}
        disabled={isGenerating}
        className="btn-pulse px-12 py-4 rounded-full text-white font-semibold text-base tracking-tight disabled:opacity-60 cursor-pointer bg-gradient-to-br from-[#E947F5] to-[#2F4BA2]"
      >
        {isGenerating ? (
          <span className="flex items-center gap-3">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating PDF…
          </span>
        ) : (
          "⬇ Download Question Paper"
        )}
      </button>
    </div>
  );
}
