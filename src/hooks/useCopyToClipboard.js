import { useState } from "react";

function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    function copyToClipboard(text) {
        const el = document.createElement("textarea");
        el.value = text;
        el.style.opacity = 0;
        el.style.position = "absolute";
        el.left = "-9999px";

        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return [copyToClipboard, copied];
}

export default useCopyToClipboard;
