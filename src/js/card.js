export class Card {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }

  toString() {
    return this.type === 'points'
      ? `${this.type}: ${this.value} points`
      : this.type;
  }
}

