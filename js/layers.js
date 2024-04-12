addLayer("a", {
    name: "aspen trees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ecb45f",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Aspen trees", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('a', 13)) mult = mult.times(upgradeEffect('a', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Aspen trees", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Wait, I thought there was no content?",
            description: "Chop double the wood per second.",
            cost: new Decimal(1),
            
        },
        12: {
            title: "Infinite potential!",
            description: "Boost point gain by aspen trees.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Not really though...",
            description: "Boost ASPEN TREE gain by POINTS. It's different this time.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    passiveGeneration(){
        return 0
    },
        
    resetDescription: "Plant "
}),
addLayer("b", {
    name: "birch trees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#f8e0bc",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Birch trees", // Name of prestige currency
    baseResource: "Aspen trees", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: reset for Birch trees", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    passiveGeneration(){return (0)},
    resetDescription: "Plant ",
    onPrestige(){
        player.points = 0
    }
})
