export function clearSelection() {
    if (window.getSelection) {
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    }
    else if (document.getSelection) {
        const selection = document.getSelection();
        if (selection) {
            selection.empty();
        }
    }
}