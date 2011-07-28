var Joint = function( id ) {
    this.id = id;
    this.children = [];
}.extend( Transformable );

Joint.prototype = {
    appendChild: function( joint ) {
        this.children.push( joint );
    }
};