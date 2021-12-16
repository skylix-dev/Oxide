<template>
	<App>
		<Button primary>Hello</Button>
	</App>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button, App } from "@illuxdev/oxide-desktop-gui/src/Exports";

export default defineComponent({
	components: {
		Button,
		App
	}
});
</script>

<style>
	:root {
    --fill_text_primary: #FFFFFF;
    --fill_text_secondary: rgba(255, 255, 255, 78.6%);
    --fill_text_tertiary: rgba(255, 255, 255, 54.42%);
    --fill_text_disabled: rgba(255, 255, 255, 36.28%);
    --fill_accentText_primary: #99EBFF;
    --fill_accentText_secondary: #99EBFF;
    --fill_accentText_tertiary: #60CDFF;
    --fill_accentText_disabled: rgba(255, 255, 255, 36.28%);
    --fill_textOnAccent_primary: #000000;
    --fill_textOnAccent_secondary: rgba(0, 0, 0, 50%);
    --fill_textOnAccent_disabled: rgba(255, 255, 255, 53.02%);
    --fill_textOnAccent_selectedText: #FFFFFF;
    --fill_control_transparent: #FFFFFF00;
    --fill_control_default: rgba(255, 255, 255, 6.05%);
    --fill_control_secondary: rgba(255, 255, 255, 8.37%);
    --fill_control_tertiary: rgba(255, 255, 255, 3.26%);
    --fill_control_disabled: rgba(255, 255, 255, 4.19%);
    --fill_control_inputActive: rgba(30, 30, 30, 70%);
    --fill_controlStrong_default: rgba(255, 255, 255, 54.42%);
    --fill_controlStrong_disabled: rgba(255, 255, 255, 24.65%);
    --fill_controlAlt_transparent: #FFFFFF00;
    --fill_controlAlt_secondary: rgba(0, 0, 0, 10%);
    --fill_controlAlt_tertiary: rgba(255, 255, 255, 4.19%);
    --fill_controlAlt_quarternary: rgba(255, 255, 255, 6.98%);
    --fill_controlAlt_disabled: #FFFFFF00;
    --fill_subtle_transparent: #FFFFFF00;
    --fill_subtle_secondary: rgba(255, 255, 255, 6.05%);
    --fill_subtle_tertiary: rgba(255, 255, 255, 4.19%);
    --fill_subtle_disabled: #FFFFFF00;
    --fill_accent_default: #60CDFF;
    --fill_accent_secondary: rgba(96, 205, 255, 90%);
    --fill_accent_tertiary: rgba(96, 205, 255, 80%);
    --fill_accent_disabled: rgba(255, 255, 255, 15.81%);
    --fill_accent_selectedTextBackground: #0078D4;
    --fill_controlSolid_default: #454545;
    --fill_system_critical: #FF99A4;
    --fill_system_success: #6CCB5F;
    --fill_system_attention: #60CDFF;
    --fill_system_caution: #FCE100;
    --fill_system_attentionBackground: rgba(255, 255, 255, 3.26%);
    --fill_system_successBackground: #393D1B;
    --fill_system_cautionBackground: #433519;
    --fill_system_criticalBackground: #442726;
    --fill_system_neutral: rgba(255, 255, 255, 54.42%);
    --fill_system_neutralBackground: rgba(255, 255, 255, 3.26%);
    --fill_system_solidAttentionBackground: #2E2E2E;
    --fill_system_solidNeutral: #9D9D9D;
    --fill_system_solidNeutralBackground: #2E2E2E;
    --fill_controlOnImage_default: rgba(28, 28, 28, 70%);
    --fill_controlOnImage_secondary: #1A1A1A;
    --fill_controlOnImage_tertiary: #131313;
    --fill_controlOnImage_disabled: #1E1E1E00;
    --elevation_control_border: rgba(255, 255, 255, 6.98%);
    --elevation_control_borderBottom: rgba(255, 255, 255, 9.3%);
    --elevation_circle_border: rgba(255, 255, 255, 6.98%);
    --elevation_circle_borderBottom: rgba(255, 255, 255, 9.3%);
    --elevation_textControl_border: rgba(255, 255, 255, 54.42%);
    --elevation_textControl_borderFocused: rgba(255, 255, 255, 54.42%);
    --elevation_accentControl_border: rgba(255, 255, 255, 8%);
    --elevation_strokeColor_controlStroke_default: rgba(255, 255, 255, 6.98%);
    --elevation_strokeColor_controlStroke_onAccentDefault: rgba(255, 255, 255, 8%);
    --elevation_strokeColor_controlStroke_secondary: rgba(255, 255, 255, 9.3%);
    --elevation_strokeColor_controlStroke_onAccentSecondary: rgba(255, 255, 255, 14%);
    --elevation_strokeColor_controlStroke_onAccentTertiary: rgba(255, 255, 255, 21.69%);
    --elevation_strokeColor_controlStroke_onAccentDisabled: rgba(255, 255, 255, 20%);
    --elevation_strokeColor_controlStroke_forStrongFillWhenOnImage: rgba(0, 0, 0, 42%);
    --elevation_strokeColor_controlStrongStroke_default: rgba(255, 255, 255, 54,42%);
    --elevation_strokeColor_controlStrongStroke_disabled: rgba(255, 255, 255, 15.81%);
    --elevation_strokeColor_dividerStroke_default: rgba(255, 255, 255, 8.37%);
    --elevation_strokeColor_surfaceStroke_default: rgba(255, 255, 255, 40%);
    --elevation_strokeColor_surfaceStroke_flyout: rgba(255, 255, 255, 20%);
    --elevation_strokeColor_cardStroke_default: rgba(0, 0, 0, 10%);
    --elevation_strokeColor_cardStroke_defaultSolid: #1C1C1C;
    --elevation_strokeColor_focusStroke_inner: #FFFFFF;
    --elevation_strokeColor_focusStroke_outer: rgba(0, 0, 0, 70%);
    --background_cardBackground_default: rgba(255, 255, 255, 5.12%);
    --background_cardBackground_secondary: rgba(255, 255, 255, 3.26%);
    --background_smoke_default: rgba(0, 0, 0, 30%);
    --background_solidBackground_base: #202020;
    --background_solidBackground_secondary: #1C1C1C;
    --background_solidBackground_tertiary: #282828;
    --background_solidBackground_quarternary: #2C2C2C;
    --background_micaBackground_base: #202020;
    --background_micaBackground_baseActive: #20202080;
    --background_acrylicBackground_default: linear-gradient(rgba(44, 44, 44, 15%), rgba(44, 44, 44, 15%)), linear-gradient(rgba(44, 44, 44, 96%), rgba(44, 44, 44, 96%));;
    --background_acrylicBackground_base: linear-gradient(rgba(32, 32, 32, 50%), rgba(32, 32, 32, 50%)), linear-gradient(rgba(32, 32, 32, 96%), rgba(32, 32, 32, 96%));;
    --background_layer_default: #3A3A3A30;
    --background_layer_alt: rgba(255, 255, 255, 5.38%);
    --background_layerOnAcrylic_default: rgba(255, 255, 255, 3.59%);
    --background_layerOnAccentAcrylic_default: rgba(255, 255, 255, 3.59%);
}
</style>