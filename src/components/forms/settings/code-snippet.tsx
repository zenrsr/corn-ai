import Section from "@/components/section-label";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast();
  let snippet = `
  <script>
    const iframe = document.createElement("iframe");
  
  const iframeStyles = (styleString) => {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
  }
  
  iframeStyles(\`
      .chat-frame {
          position: fixed;
          bottom: 50px;
          right: 50px;
          border: none;
      }
  \`)
  
  iframe.src = "http://localhost:3000/chatbot"
  iframe.classList.add('chat-frame')
  document.body.appendChild(iframe)
  
  window.addEventListener("message", (e) => {
      if(e.origin !== "http://localhost:3000") return null
      let dimensions = JSON.parse(e.data)
      iframe.width = dimensions.width
      iframe.height = dimensions.height
      iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")
  })
  </script>
      `;

  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        label="Code Snippet"
        message="Copy and paste the code below inside the script tag, inside the body element of your website to embed the chatbot in your website."
      />
      <div className="bg-cream px-10 rounded-lg inline-block relative">
        <Copy
          className="absolute top-5 right-5 text-gray-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            toast({
              title: "Code snippet copied.",
              description: "You can now paste the code in your website."
            });
          }}
        />
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
