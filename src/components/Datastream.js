import React, { Component } from 'react'
import moment from 'moment'


class Datastream extends Component {
    constructor() {
        super()
    
        this.state = {
          name: '',
        }
      }
    
    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        change[e.target.name] = e.target.value
        console.log(change)
        this.setState(change)
      }

    render() {
        const {
            datastream,
            owner,
            onClick,
            newVal
        } = this.props

        if (!datastream) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div className="datastream-container">
                <h3>{ datastream._assetId }</h3>
                <p>This Asset is owned by {owner.name}</p>
                <hr />
                <div
                    className="datastream-epoch datastream-epoch-add"
                    onClick={() => onClick(datastream._txId, this.state.name)} >
                    + Generate randomish datapoint
                </div>
                <div className="datastream-epoch datastream-epoch-add">
                    <input  type="name" 
                            value={this.state.name} 
                            onChange={this.handleChange.bind(this)}
                    ></input>
                </div>
                {
                    datastream.provenance
                        .reverse()
                        .map(epoch => (
                            <div
                                className="datastream-epoch"
                                key={epoch._txId}>
                                <span>
                                    {
                                        moment
                                            .unix(epoch.metadata.time / 1000)
                                            .format('YYYY-MM-DD HH:mm:ss')
                                    }
                                </span>
                                <span> - { epoch._txId}</span>
                                <span className="datastream-epoch-data">{ epoch.metadata.value }</span>
                                <span className="datastream-epoch-data">{ epoch.metadata.payload ? epoch.metadata.payload.title : "." }</span>
                        </div>
                        ))
                }
            </div>
        )
    }
}

export default Datastream

