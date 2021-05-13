// Will utilize this class when creating multiplayer game.

class CreateElement {
    constructor(elementType, elementClass, elementParent, elementInnerHTML, elementStyle) {
        this.elementType = elementType;
        this.elementClass = elementClass;
        this.elementParent = elementParent;
        this.elementInnerHTML = elementInnerHTML;
        this.elementStyle = elementStyle;
    }

    createElement() {
        let element = document.createElement(this.elementType);
        element.setAttribute('class', this.elementClass);
        if (this.elementInnerHTML) {
            element.innerHTML = this.elementInnerHTML;
        }
        return element;
    };

    addStyles() {
        let element = this.createElement();
        this.elementStyle.forEach(function (property) {
            let style = Object.keys(property)[0];
            element.style[style] = Object.values(property)[0];
        });
        return element;
    }

    addElement() {
        let element = this.addStyles();
        document.querySelector(this.elementParent).appendChild(element);
    }
}