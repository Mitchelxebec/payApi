import { useState } from "react";

const CodeSnippet = () => {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<"node" | "python">("node");

  const nodeCode = `const payapi = require('payapi-sdk');
const client = payapi.init('sk_live_293847...');

async function authenticate() {
  try {
    const status = await client.auth.verify();
    console.log('Auth Status:', status);
  } catch (error) {
    console.error(error);
  }
}`;

  const pythonCode = `import payapi

# Initialize with your secret key
client = payapi.Client(api_key='sk_live_293847...')

def authenticate():
    try:
        status = client.auth.verify()
        print(f"Auth Status: {status}")
    except Exception as e:
        print(f"Error: {e}")`;

  const handleCopy = async () => {
    const textToCopy = activeLang === "node" ? nodeCode : pythonCode;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-dark-bg py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Implementation Example
          </h2>
          <div className="flex gap-2 bg-[#1c1c24] p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setActiveLang("node")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeLang === "node" ? "bg-[#2d2d39] text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              Node.js
            </button>
            <button
              onClick={() => setActiveLang("python")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeLang === "python" ? "bg-[#2d2d39] text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              Python
            </button>
          </div>
        </div>

        {/* Code Editor Window */}
        <div className="bg-[#1c1c24] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center px-6 py-4 bg-[#21212a] border-b border-gray-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              {copied ? "Copied!" : "Copy Snippet"}
            </button>
          </div>

          <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed flex">
            <div className="pr-6 text-gray-700 text-right select-none border-r border-gray-800 mr-6">
              {Array.from({ length: activeLang === "node" ? 11 : 10 }).map(
                (_, i) => (
                  <div key={i}>{i + 1}</div>
                ),
              )}
            </div>

            <pre className="text-gray-300">
              {activeLang === "node" ? (
                <code>
                  <span className="text-orange-400">const</span> payapi ={" "}
                  <span className="text-orange-400">require</span>(
                  <span className="text-green-400">'payapi-sdk'</span>);
                  <br />
                  <span className="text-orange-400">const</span> client =
                  payapi.<span className="text-blue-400">init</span>(
                  <span className="text-green-400">'sk_live_293847...'</span>);
                  <br />
                  <br />
                  <span className="text-orange-400">async function</span>{" "}
                  <span className="text-blue-400">authenticate</span>() {"{"}
                  <br />
                  {"  "}
                  <span className="text-orange-400">try</span> {"{"}
                  <br />
                  {"    "}
                  <span className="text-orange-400">const</span> status ={" "}
                  <span className="text-orange-400">await</span> client.auth.
                  <span className="text-blue-400">verify</span>();
                  <br />
                  {"    "}console.<span className="text-blue-400">log</span>(
                  <span className="text-green-400">'Auth Status:'</span>,
                  status);
                  <br />
                  {"  "}
                  {"}"} <span className="text-orange-400">catch</span> (error){" "}
                  {"{"}
                  <br />
                  {"    "}console.<span className="text-blue-400">error</span>
                  (error);
                  <br />
                  {"  "}
                  {"}"}
                  <br />
                  {"}"}
                </code>
              ) : (
                <code>
                  <span className="text-orange-400">import</span> payapi
                  <br />
                  <br />
                  <span className="text-gray-500">
                    # Initialize with your secret key
                  </span>
                  <br />
                  client = payapi.
                  <span className="text-yellow-400">Client</span>(api_key=
                  <span className="text-green-400">'sk_live_293847...'</span>)
                  <br />
                  <br />
                  <span className="text-orange-400">def</span>{" "}
                  <span className="text-blue-400">authenticate</span>():
                  <br />
                  {"    "}
                  <span className="text-orange-400">try</span>:<br />
                  {"        "}status = client.auth.
                  <span className="text-blue-400">verify</span>()
                  <br />
                  {"        "}
                  <span className="text-orange-400">print</span>(
                  <span className="text-green-400">
                    f"Auth Status: {"{"}status{"}"}"
                  </span>
                  )<br />
                  {"    "}
                  <span className="text-orange-400">except</span>{" "}
                  <span className="text-yellow-400">Exception</span>{" "}
                  <span className="text-orange-400">as</span> e:
                  <br />
                  {"        "}
                  <span className="text-orange-400">print</span>(
                  <span className="text-green-400">
                    f"Error: {"{"}e{"}"}"
                  </span>
                  )
                </code>
              )}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSnippet;
