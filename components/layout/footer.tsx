import Link from 'next/link';

export function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

  return (
    <footer className="bg-canvas border-t border-hairline py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-fraunces font-medium text-lg text-ink mb-2">
              Walon Foundation
            </p>
            <p className="text-mist text-sm max-w-xs">
              Custom software and open-source tools. Freetown, Sierra Leone.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-mist">
            <a
              href="https://github.com/Walon-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:walonfoundation@gmail.com"
              className="hover:text-ink transition-colors"
            >
              walonfoundation@gmail.com
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hairline flex flex-col sm:flex-row justify-between gap-4 text-xs text-mist">
          <span>Freetown, Sierra Leone · MIT-licensed — open by default</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
