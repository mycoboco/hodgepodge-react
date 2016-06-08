/*
 *  <IconButtons> module based on material-ui's IconButton
 */

var React = require('react')
var ReactDOM = require('react-dom')

var IconButton = require('material-ui/IconButton')['default']
var FontIcon = require('material-ui/FontIcon')['default']

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
                    width:   button.size*1.5,
                    height:  button.size*1.5,
                    padding: button.size/4
                })
                Object.assign(button.prop.iconStyle, {
                    fontSize:   button.size,
                    textShadow: (button.shadow)? '0 0 10px '+button.shadow: 'none'
                })
            }

            if (button.prop && button.prop.disabled) {
                button.color = self.context.muiTheme.palette.disabledColor
            } else if (!button.color) {
                button.color = self.context.muiTheme.icon.color
            }

            Buttons.push(
                <div className={(button.prop && button.prop.disabled)?
                                    'icon-buttons--disabled': ''}>
                    <IconButton {...button.prop}
                                onTouchTap={handler}>
                        <FontIcon className="material-icons"
                                  style={button.prop && button.prop.iconStyle}
                                  color={button.color}>{button.name}</FontIcon>
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
