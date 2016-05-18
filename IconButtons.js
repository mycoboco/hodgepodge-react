/*
 *  <IconButtons> module based on material-ui's IconButton
 */

var React = require('react')
var ReactDOM = require('react-dom')

var IconButton = require('material-ui/IconButton')['default']

require('./IconButtons.scss')


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

    render: function () {
        var self = this
        var Buttons = []

        this.props.buttons.forEach(function (button, idx) {
            var handler = function (e) {
                e.preventDefault()
                e.stopPropagation()
                self.props.handler(e.target, button.key)
            }

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
            button.iconProp = button.iconProp || {}
            if (button.prop && button.prop.disabled) {
                button.iconProp.color = self.context.muiTheme.palette.disabledColor
            } else if (!button.iconProp.color) {
                button.iconProp.color = self.context.muiTheme.icon.color
            }

            Buttons.push(
                <div className={(button.prop && button.prop.disabled)? 'icon-buttons--disabled': ''}>
                    <IconButton {...button.prop}
                                onTouchTap={handler}>
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
