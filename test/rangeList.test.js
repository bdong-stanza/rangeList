const RangeList = require('rangelist');

test('1. should be able to add multiple ranges to the list', () => {
    const rl = new RangeList();
    rl.add([1, 5]);
    expect(rl.print()).toBe('[1, 5)');

    rl.add([10, 20])
    expect(rl.print()).toBe('[1, 5) [10, 20)');

    rl.add([20, 20]);
    expect(rl.print()).toBe('[1, 5) [10, 20)');

    rl.add([20, 21]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');

    rl.add([2, 4]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');

    rl.add([]);
    expect(rl.print()).toBe('[1, 5) [10, 21)');

    rl.add([3, 8]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');

    expect(() => {
        rl.add([22, 4]);
    }).toThrow('Invalid range - start is larger than end');

    expect(() => {
        rl.add([22]);
    }).toThrow('Non sufficient number of ranges');

    expect(() => {
        rl.add((22,30));
    }).toThrow('Invalid input type - should be an array');
});


test('2. should be able to remove multiple ranges to the list', () => {
    const rl = new RangeList([[1, 8], [10, 21]]);
    
    rl.remove([10, 10]);
    expect(rl.print()).toBe('[1, 8) [10, 21)');

    rl.remove([10, 11]);
    expect(rl.print()).toBe('[1, 8) [11, 21)');

    rl.remove([15, 17]);
    expect(rl.print()).toBe('[1, 8) [11, 15) [17, 21)');

    rl.remove([3, 19]);
    expect(rl.print()).toBe('[1, 3) [19, 21)');

    rl.remove([-30, 20]);
    expect(rl.print()).toBe('[20, 21)');

    rl.remove([]);
    expect(rl.print()).toBe('[20, 21)');

    rl.remove([20,21]);
    expect(rl.print()).toBe('[)');

    expect(() => {
        rl.remove([22, 4]);
    }).toThrow('Invalid range - start is larger than end');

    expect(() => {
        rl.remove([22]);
    }).toThrow('Non sufficient number of ranges');

    expect(() => {
        rl.add((22,30));
    }).toThrow('Invalid input type - should be an array');
});

test('3. should be able to perform add and remove operations at the same time', () => {
    const rl = new RangeList([[1, 3], [19, 21]]);

    rl.remove([-30, 20]);
    expect(rl.print()).toBe('[20, 21)');

    rl.add([-30, 10]);
    expect(rl.print()).toBe('[-30, 10) [20, 21)');

    rl.remove([-30, 20]);
    expect(rl.print()).toBe('[20, 21)');

    rl.add([1,100]);
    expect(rl.print()).toBe('[1, 100)');

    rl.remove([0,101]);
    expect(rl.print()).toBe('[)');
});