function CopyTextLib() {
    const copyText = "npm i next-office-generator";
    navigator.clipboard.writeText(copyText);
    document.getElementsByClassName("index_copyToClipboardMessage")[0].style.opacity= "1";
    document.getElementsByClassName("index_copyToClipboardMessage")[0].style.display = "flex";
    setTimeout(() => {
        document.getElementsByClassName("index_copyToClipboardMessage")[0].style.opacity= "0";
    }, 1500);
    setTimeout(() => {
        document.getElementsByClassName("index_copyToClipboardMessage")[0].style.display= "none";
    }, 2000);
}