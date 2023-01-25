type modValueType = string | number | boolean | null | undefined;

export class ModController {
  _domElem: HTMLElement;
  _blockName: string;
  _mods: { [key: string]: modValueType };

  constructor(domElement: HTMLElement, blockName: string) {
    this._domElem = domElement;
    this._blockName = blockName;
    this._mods = {};

    this.setMod = this.setMod.bind(this);
    this.removeAllMods = this.removeAllMods.bind(this);
  }

  _getClassName(modificator: string) {
    const value = this._mods[modificator];

    if (!value && value !== 0) {
      return '';
    }

    const classValue = value === true ? '' : `_${value}`;

    return `${this._blockName}_${modificator}${classValue}`;
  }

  setMod(modificatorName: string, value: modValueType = true, redraw = false) {
    const oldModificator = this._getClassName(modificatorName);
    if (oldModificator) {
      this._domElem.classList.remove(oldModificator);

      if (redraw) {
        void this._domElem.offsetWidth;
      }
    }

    this._mods[modificatorName] = value;

    const newModificator = this._getClassName(modificatorName);
    if (newModificator) {
      this._domElem.classList.add(newModificator);
    }
  }

  removeAllMods() {
    Object.keys(this._mods).forEach(modificatorName => {
      const modificator = this._getClassName(modificatorName);
      if (modificator) {
        this._domElem.classList.remove(modificator);
      }
    });

    this._mods = {};
  }
}
