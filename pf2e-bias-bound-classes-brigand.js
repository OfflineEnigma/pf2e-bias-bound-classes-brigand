Hooks.on("createItem", async (item) => {
    if (item.sourceId === "Compendium.pf2e-bias-bound-classes-brigand.abilities.Item.fusZT9P4aqd63WIh") {
        updateExploitingAttackDuration(item);
        return;
    }

    if (item.sourceId === "Compendium.pf2e-bias-bound-classes-brigand.abilities.Item.b44SKLhOuPGA9Clo") {
        updateRoundOutDuration(item);
        return;
    }
})

/**
 * Increases the duration of Effect: Exploiting Attack based on how many bonus rounds the PC has.
 * Brigand increases this every 4 levels, the archetype needs to pick up feats for this.
 */
function updateExploitingAttackDuration(item) {
    const bonusRounds = item.origin?.getFlag("pf2e", "brigand.bonusRounds");
    if (typeof bonusRounds !== "number") return;

    const duration = item.system.duration.value;

    item.update({
        system: {
            duration: {
                value: duration + bonusRounds
            },
        },
    });
}

/**
 * Round Out's effect goes from 2 rounds to 3 at level 16.
 */
function updateRoundOutDuration(item) {
    if (item.origin && item.origin.level >= 16) {
        item.update({
            system: {
                duration: {
                    value: 3
                },
            },
        });
    }
}