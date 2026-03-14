interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="mt-4 max-w-md mx-auto">
      <div className="flex justify-between text-[11px] text-white/30 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-500 bg-linear-to-r from-[#E947F5] to-[#2F4BA2]"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
