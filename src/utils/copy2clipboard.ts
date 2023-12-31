export function copyToClipboard(text: string) {
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        // 使用 execCommand 方法（兼容较老的浏览器）
        const textarea = document.createElement('textarea');
        textarea.textContent = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    } else if (navigator.clipboard) {
        // 使用 Clipboard API（较新的浏览器支持）
        navigator.clipboard.writeText(text).then(() => {
        }).catch((error) => {
            console.error('复制失败:', error);
        });
    } else {
        // 浏览器不支持复制
        alert('抱歉，您的浏览器不支持复制操作。请手动复制文本。');
    }
}