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
        if (hasUpgrade('b', 12)) mult = mult.times(2)
        if (hasUpgrade('b', 13)) mult = mult.times(upgradeEffect('b', 13))
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
        if (hasUpgrade('c', 12)) mult = mult.times(2)
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
    upgrades: {
        11: {
            title: "Back to the beginning",
            description: "Chop double the wood per second.",
            cost: new Decimal(1)
        },
        12: {
            title: "Alphabetical math",
            description: "Double Aspen tree gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "Wait. Isn't that just algebra?",
            description: "Boost ASPEN TREE gain by BIRCH TREES. It's different again, but it's differently different so it's still different.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    passiveGeneration(){return (0)},
    resetDescription: "Plant ",
    onPrestige(){
        player.points = 0
    }
})
addLayer("c", {
    name: "cedar trees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#711a00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Cedar trees", // Name of prestige currency
    baseResource: "Birch trees", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for cedar trees", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Back to the beginning, but better",
            description: "Chop quadruple (4x) the wood per second.",
            cost: new Decimal(1)
        },
        12:	{
        		title: "I'll try to make this a bit easier,",
            description: "As in a bit less grindy. Double your Birch tree gain.",
            cost: new Decimal(2)
        },
        13: {
        		title: "Ok. You ready for inflation?",
            description: "Square wood gain. This might be op.",
            cost: new Decimal(4)
        }
    },
    buyables: {
    	11: {
        	cost(x) { return new Decimal(5).mul(x) },
        	display() { return "Multiply wood gain by 5 per purchase" }, // ADD THIS
        	canAfford() {return player[this.layer].points.gte(this.cost())},
        	buy() {
            	player[this.layer].points = player[this.layer].points.sub(this.cost())
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        	},
          effect() {
                return player[this.layer].points.add(1).pow(0.35)
         	},
          unlocked(){return false}
    },
},
    passiveGeneration(){return (0)},
    resetDescription: "Plant "
})