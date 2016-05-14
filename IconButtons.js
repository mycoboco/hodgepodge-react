var React = require('react')
var ReactDOM = require('react-dom')

var IconButton = require('material-ui/IconButton')['default']


module.exports = React.createClass({
    // dev
    propTypes: {
        buttons: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        prop:    React.PropTypes.object,
        show:    React.PropTypes.bool,
        size:    React.PropTypes.number,
        handler: React.PropTypes.func.isRequired
    },

    render: function () {
        var self = this
        var Buttons = []

        this.props.buttons.forEach(function (button, idx) {
            if (button.show === false) return    // undefined is considered true

            if (typeof button.size === 'number') {
                button.prop = button.prop || {}
                button.prop.style = button.prop.style || {}
                button.prop.iconStyle = button.prop.iconStyle || {}

                Object.assign(button.prop.style, {
                    width:   button.size*2,
                    height:  button.size*2,
                    padding: button.size/2
                })
                Object.assign(button.prop.iconStyle, {
                    width:  button.size,
                    height: button.size
                })
            }
            Buttons.push(
                <IconButton {...button.prop}>
                    {React.createElement(button.Element, button.iconProp)}
                </IconButton>
            )
        })

        return (
            <div className={'buttons--root '+(this.props.className || '')}
                 onTouchTap={this.handler}>
                {Buttons}
            </div>
        )
    }
})

// end of IconButtons.js
