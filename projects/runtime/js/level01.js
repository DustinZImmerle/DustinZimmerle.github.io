var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "SawBlade", "x": 500, "y": groundY },
                { "type": "SawBlade", "x": 1200, "y": groundY },
                { "type": "SawBlade", "x": 2200, "y": groundY },
                { "type": "SawBlade", "x": 2800, "y": groundY},
                { "type": "MyObstacle", "x": 700, "y": groundY - 125},
                { "type": "MyObstacle", "x": 1600, "y": groundY - 125},
                { "type": "Enemy", "x": 700, "y": groundY - 50},
                { "type": "Enemy", "x": 1700, "y": groundY - 25},
                { "type": "Enemy", "x": 2200, "y": groundY - 70},
                { "type": "Health", "x": 900, "y": groundY - 80}
            ]
        };

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItemObject = levelData.gameItems[i];
                if (gameItemObject.type === 'SawBlade'){
                    createSawBlade(gameItemObject.x, gameItemObject.y);
                }
                if (gameItemObject.type === 'MyObstacle'){
                    createMyObstacle(gameItemObject.x, gameItemObject.y);
                }                
                if (gameItemObject.type === 'Enemy'){
                    createEnemy(gameItemObject.x, gameItemObject.y);
                }
                if (gameItemObject.type === 'Health'){
                    createHealth(gameItemObject.x, gameItemObject.y);
                }
        };

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;

        };

        function createMyObstacle(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var meteorHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

            meteorHitZone.x = x;
            meteorHitZone.y = y;
            game.addGameItem(meteorHitZone);

            var obstacleImage = draw.bitmap('img/Meteor.png');
            meteorHitZone.addChild(obstacleImage);
            obstacleImage.x = -150;
            obstacleImage.y = -125;
        };
        
        function createEnemy(x, y) {

                var enemy = game.createGameItem('enemy',25);
                var Alien = draw.bitmap('img/Cp-toy_alien.png');
                Alien.x = -140;
                Alien.y = -100;
                enemy.addChild(Alien);
                enemy.x = x;
                enemy.y = y;
                enemy.velocityX = -1;
                enemy.rotationalVelocity = 1;
                game.addGameItem(enemy);

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function() {
                console.log('The enemy has hit Halle');
                game.increaseScore(100);
                enemy.shrink();
            };
        };

        function createHealth(x, y) {
            
            var health = game.createGameItem('health',25);
            var heart = draw.bitmap('img/heart.png');
            heart.x = -68;
            heart.y = -70;
            health.addChild(heart);
            health.x = x;
            health.y = y;
            health.velocityX = -1;
            game.addGameItem(health);

            health.onPlayerCollision = function() {
                console.log('Halle has gained health');
                game.changeIntegrity(+10);
                health.fadeOut();
            };
        };

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
