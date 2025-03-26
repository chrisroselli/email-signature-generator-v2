import SignatureGenerator from '@/components/signature-generator';

export default function Home() {
  return (
    <main className="container mx-auto bg-[#f6f6f6] px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex-shrink-0">
          <img
            src="https://cdn.treehouseinternetgroup.com/cms_core/images/branding/th/th-marketing-logo-2021.svg"
            alt="Treehouse Internet Group"
            className="h-12 w-auto"
          />
        </div>
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-[#47403d]">Email Signature Generator</h1>
          <p className="text-[#47403d]/70">
            Create a professional email signature for Microsoft Outlook
          </p>
        </div>
      </div>
      <SignatureGenerator />
    </main>
  );
}
