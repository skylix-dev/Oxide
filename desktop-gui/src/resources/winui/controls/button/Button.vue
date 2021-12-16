<template>
    <div class="button">
        <div :class="'inner' + ($props.disabled ? ' mode-disabled' : '') + ($props.primary ? ' mode-primary' : '')">
            <span>
                <slot />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        primary: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../SassTheme.scss";

.button {
    display: inline-flex;
    align-items: flex-start;

    .inner {
        min-width: 120px;
        height: 32px;
        background: $fill_control_default;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: $_font;
        font-size: 14px;
        transition: background 100ms ease-in-out, color 100ms ease-in-out;
        color: $fill_text_primary;
        user-select: none;
        border: 1px solid $elevation_control_border;
        border-bottom-color: $elevation_control_borderBottom;

        &.mode-primary {
            background: $fill_accent_default;
            color: $fill_accentText_primary;
            border-width: 0;
        }

        &.mode-disabled {
            background: $fill_control_disabled;
            color: $fill_text_disabled;
            pointer-events: none;
            border-color: $elevation_strokeColor_controlStroke_default;

            &.mode-primary {
                background: $fill_accent_disabled;
            }
        }

        &:hover {
            background: $fill_control_secondary;
            border-color: $elevation_strokeColor_controlStroke_default;

            &.mode-primary {
                background: $fill_accent_secondary;
            }

            &:active {
                background: $fill_control_tertiary;
                color: $fill_text_tertiary;

                &.mode-primary {
                    background: $fill_accent_tertiary;
                    color: $fill_textOnAccent_secondary;;
                }
            }
        }
    }
}
</style>
