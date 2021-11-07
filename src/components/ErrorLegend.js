import react from 'react'

import './styles/ErrorLegend.css'

export default function ErrorLegend(props) {
    if (!props.show) {
        return null;
    }
    return (
        <react.Fragment>
            <div class="text-danger errorlegend-container">
                <div className="errorlegend-message">
                    {props.message}
                </div>
            </div>
        </react.Fragment>
    )
}
