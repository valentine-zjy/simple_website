type FooterProps = {
  text: string;
  maxWidthClass: string;
};

export function Footer({ text, maxWidthClass }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 py-6">
      <div
        className={`mx-auto w-full px-4 text-sm text-slate-500 sm:px-6 ${maxWidthClass}`}
      >
        {text}
      </div>
    </footer>
  );
}
