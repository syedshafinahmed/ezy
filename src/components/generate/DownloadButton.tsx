import { BsDownload } from "react-icons/bs";

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
        className="btn-pulse px-12 py-4 rounded-full text-white font-extralight text-base tracking-tight disabled:opacity-60 cursor-pointer bg-linear-to-br from-[#E947F5] to-[#2F4BA2] flex items-center gap-2"
      >
        {isGenerating ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating PDF…
          </>
        ) : (
          <>
            <BsDownload />
            Download Question Paper
          </>
        )}
      </button>
    </div>
  );
}
