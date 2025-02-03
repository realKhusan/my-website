import type React from "react";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const lines = code.split("\n");

  return (
    <pre className="p-4 font-mono text-sm w-full h-full overflow-x-auto">
      {lines.map((line, index) => (
        <div key={index}>
          <span className="text-gray-500 mr-4">{index + 1}</span>
          {line}
        </div>
      ))}
    </pre>
  );
};

export default CodeBlock;
