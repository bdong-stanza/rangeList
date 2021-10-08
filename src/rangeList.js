//Problem Set below:
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these rangeList: [1, 5), [10, 11), [100,201)
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/
class RangeList {
    constructor(range){
        this.rangeList = range ? [...range]:[];
    }
    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and range[1] of range.
    */
    add(range) {
        if(typeof range !== 'object'){
            throw new Error('Invalid input type - should be an array');
        }
        if(range.length == 0){
            return this.rangeList;
        }
        if(range[0] > range[1]){
            throw new Error('Invalid range - start is larger than end');
        }
        if(range.length < 2){
            throw new Error('Non sufficient number of ranges');
        }
        let i = 0
        while (i < this.rangeList.length){
            let [start, end] = this.rangeList[i]
            if (range[1] < start){
                this.rangeList.splice(i, 0, range)
                return
            }
            if(range[0] <= end){
                let result_range = [Math.min(range[0], start), Math.max(range[1], end)]
                this.rangeList.splice(i, 1)
                this.add(result_range)
                return
            }
            i+= 1
        }
        this.rangeList.push(range)
    }
    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and range[1] of range.
    */
    remove(range) {
        if(typeof range !== 'object'){
            throw new Error('Invalid input type - should be an array');
        }
        if(range.length == 0){
            return this.rangeList;
        }
        if(range[0] > range[1]){
            throw new Error('Invalid range - start is larger than end');
        }
        if(range.length < 2){
            throw new Error('Non sufficient number of ranges');
        }
        let i = 0
        while (i < this.rangeList.length){
            let [start, end] = this.rangeList[i]
            if (range[1] < start){
                return
            }
            if(!(end <= range[0] || range[1] <= start)){
                let res = [[start,range[0]],[range[1],end]]
                let result_range = res.filter(([s,e]) => e > s)
                this.rangeList.splice(i, 1, ...result_range)
                i += (result_range.length - 1)
            }
            i += 1
        }
    }
    /**
    * Prints out the list of rangeList in the range list
    */
    print() {
        let res = ""
        if(this.rangeList.length == 0){
            console.log("[)")
            return "[)"
        }
        else{
            for(var i = 0; i < this.rangeList.length; i++){
                res += "[" + this.rangeList[i][0]+ ", " + this.rangeList[i][1] + ") "
            }
            console.log(res)
            return res.trim();
        }
    }
}

module.exports = RangeList;