class RetentionMatrix {
	constructor(config) {
  	this.groundParams = config.groundParams;
    this.xLength = config.xLength;
    this.yLength = config.yLength;
    this.defaultValue = config.defaultValue;
    this.excluded = config.excluded;
    this.groundCells = this.xLength * this.yLength;
    this.paramsCount =  this.groundParams.reduce((accumulator, currentValue) => {
    	return accumulator + currentValue.count;
    }, 0);
    this.result = [];
  }
  
  _checkConfig() {
    return this.groundCells >= this.paramsCount;
  }
  
  _generateMatrix() {
  	// Create Array with default values
    let tempArray = new Array(this.groundCells - this.paramsCount).fill(this.defaultValue);
    
    // Expand tempArray with Config values
    this.groundParams.forEach(param => {
    	const paramArray = new Array(param.count).fill(param.value);
      tempArray = [...tempArray, ...paramArray];
    });
    
    // Shuffle array
    tempArray = tempArray.sort((a, b) => 0.5 - Math.random());

		// Create matrix array
    for (let i = 0; i < this.yLength; i++) {
    	const currentPosition = i*this.xLength;
      this.result[i] = tempArray.slice(currentPosition, currentPosition + this.xLength);
    }
  }
  
  getResult() {
  	if (!this._checkConfig()) {
    	throw new Error('Configuration error')
    }
    this._generateMatrix();
    return this.result;
  }
}

export {RetentionMatrix} ;