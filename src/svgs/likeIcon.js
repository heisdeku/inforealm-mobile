import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function LikeActive() {
    const svgMarkup = `<svg width="24" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.75479 5.69029V2.4387C9.75478 1.79191 9.49785 1.17162 9.04051 0.714278C8.58316 0.256933 7.96287 0 7.31609 0L4.06449 7.31609V16.258H13.234C13.6261 16.2624 14.0066 16.125 14.3053 15.871C14.6041 15.6171 14.801 15.2637 14.8598 14.876L15.9816 7.55996C16.017 7.32695 16.0012 7.08903 15.9355 6.8627C15.8698 6.63636 15.7557 6.42702 15.601 6.24917C15.4464 6.07132 15.2549 5.92923 15.0399 5.83273C14.8249 5.73622 14.5915 5.68762 14.3558 5.69029H9.75479ZM4.06449 16.258H1.6258C1.19461 16.258 0.781081 16.0867 0.476185 15.7818C0.171289 15.4769 0 15.0634 0 14.6322V8.94189C0 8.5107 0.171289 8.09717 0.476185 7.79227C0.781081 7.48738 1.19461 7.31609 1.6258 7.31609H4.06449" fill="#E33127"/>
    </svg>
    `
    const SvgImage = () => <SvgXml style={{ alignSelf: 'flex-start', }} xml={svgMarkup} width="24px" />

    return <SvgImage />
}