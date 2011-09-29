// extern
var Node, Drawable;

function Scene() {
    Node.call( this );
    this.drawableList = [];
}

Scene.prototype = {
    constructor: Scene,
    findClass: function( node, theClass ) {
        var bucket = [], bucketIndex = 0,
            stack = [ node ], stackIndex = 1,
            children, l;
        while ( stackIndex ) {
            node = stack[ --stackIndex ];
            if ( node instanceof theClass ) {
                bucket[ bucketIndex++ ] = node;
            }
            children = node.children;
            l = children.length;
            while ( l-- ) {
                stack[ stackIndex++ ] = children[ l ];
            }
        }
        return bucket;
    },
    onChildAdded: function( node, nodeAdded ) {
        this.Node_onChildAdded( node, nodeAdded );
        var drawables = this.findClass( nodeAdded, Drawable );
        this.drawableList.push.apply( this.drawableList, drawables );
    },
    onChildRemoved: function( node, nodeRemoved ) {
        var drawables = this.findDrawables( nodeRemoved, Drawable );
        var l = drawables.length;
        while ( l-- ) {
            this.drawableList.splice( this.drawableList.indexOf( drawables[ l ] ), 1 );
        }
    }
};

Scene.extend( Node );
