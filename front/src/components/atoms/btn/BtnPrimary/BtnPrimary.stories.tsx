import BtnPrimary from "./BtnPrimary"
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: "Components/atoms/btn/BtnPrimary",
    component: BtnPrimary 
}

export  const BtnPrimaryStory: ComponentStory<typeof BtnPrimary> = (args) => <BtnPrimary {...args}/>;