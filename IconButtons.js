/*
 *  <IconButtons> module based on material-ui's IconButton
 */

var React = require('react')
var ReactDOM = require('react-dom')

var $ = require('jquery')
var IconButton = require('material-ui/IconButton')['default']


module.exports = React.createClass({
    // dev
    propTypes: {
        buttons:   React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        className: React.PropTypes.string,
        handler:   React.PropTypes.func.isRequired
    },

    // context
    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    // event handlers
    handleClick: function (e) {
        var $button = ($(e.target).is('button'))? $(e.target): $(e.target).parents('button')
        this.props.handler(e.target, $button)
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
            if (button.prop.disabled) {
                button.iconProp = button.iconProp || {}
                button.iconProp.color = self.context.muiTheme.palette.primary3Color
            }

            Buttons.push(
                <div>
                    <IconButton {...button.prop}
                                onTouchTap={self.handleClick} >
                        {React.createElement(button.Element, button.iconProp)}
                    </IconButton>
                </div>
            )
        })

        return (
            <div className={'icon-buttons--root '+(this.props.className || '')}>
                {Buttons}
            </div>
        )
    }
})

// end of IconButtons.js
