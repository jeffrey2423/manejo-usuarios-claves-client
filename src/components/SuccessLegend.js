import react from 'react'

import './styles/SuccessLegend.css'

export default function SuccessLegend(props) {
    if (!props.show) {
        return null;
    }
    return (
        <react.Fragment>
            <div class="text-success successlegend-container">
                <div className=".successlegend-message">
                    {props.message}
                </div>
            </div>
        </react.Fragment>
    )
}
