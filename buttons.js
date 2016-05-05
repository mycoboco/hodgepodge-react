var React = require('react')
var ReactDOM = require('react-dom')

require('./buttons.scss')


module.exports = React.createClass({
    // dev
    propTypes: {
        className: React.PropTypes.string,
        buttons:   React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        handler:   React.PropTypes.func.isRequired
    },

    // event handlers
    handleClick: function (e) {
        this.props.handler(e.target)
    },

    render: function () {
        var self = this
        var buttons = []

        this.props.buttons.forEach(function (button, idx) {
            if (button.show === false) return    // undefined is considered true
            buttons.push(
                <i key={button.className+idx} data-key={button.key}
                   className={'fa '+button.className+' '+((button.off)? 'buttons--off': '')}
                   aria-hidden="true"></i>
            )
        })

        return (
            <div className={'buttons--root '+this.props.className} onClick={this.handleClick}>
                {buttons}
            </div>
        )
    }
})

// end of buttons.js
