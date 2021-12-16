<template>
    <div class="app">
        <div class="title-bar">
            <div class="title-area">
                <div v-if="showTitleArea" class="icon-outer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2048px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png" alt="ERR" />
                </div>

                <span v-if="showTitleArea" class="text">{{ title }}</span>
            </div>

            <div class="window-buttons">
                <button>
                    <Icon style="font-size: 18px" :icon="icons.subtract16Regular" />
                </button>

                <button>
                    <Icon v-if="titleBar.maximized" style="font-size: 16px" :icon="icons.restore16Regular" />
                    <Icon v-else style="font-size: 18px" :icon="icons.maximize16Regular" />
                </button>
                
                <button class="mode-close">
                    <Icon style="font-size: 17px" :icon="icons.dismiss16Regular" />
                </button>
            </div>
        </div>

        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import dismiss16Regular from '@iconify-icons/fluent/dismiss-16-regular';
import subtract16Regular from '@iconify-icons/fluent/subtract-16-regular';
import restore16Regular from '@iconify-icons/fluent/restore-16-regular';
import maximize16Regular from '@iconify-icons/fluent/maximize-16-regular';

export default defineComponent({
    components: {
        Icon
    },
    data() {
        return {
            icons: {
                dismiss16Regular,
                subtract16Regular,
                restore16Regular,
                maximize16Regular
            },
            titleBar: {
                maximized: false
            }
        }
    },
    props: {
        title: {
            type: String,
            default: "Application"
        },
        showTitleArea: {
            type: Boolean,
            default: true
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../SassTheme.scss";

.app {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    .title-bar {
        -webkit-app-region: drag;
        width: 100%;
        height: 32px;
        background: $background_solidBackground_base;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .window-buttons {
            -webkit-app-region: no-drag;
            display: flex;

            button {
                border: none;
                width: 48px;
                height: 32px;
                font-size: 16px;
                background: transparent;
                color: $fill_text_primary;
                display: flex;
                align-items: center;
                justify-content: center;
                outline: none;

                &.mode-close {
                    &:hover {
                        background: #c82c1c;
                        color: #fff;

                        &:active {
                            background: rgba(196, 43, 28, 80%);
                        }
                    }
                }

                &:hover {
                    background: $fill_subtle_secondary;

                    &:active {
                        background: $fill_subtle_tertiary;
                        color: $fill_text_tertiary;
                    }
                }
            }
        }

        .title-area {
            display: flex;
            margin-left: 20px;
            gap: 10px;

            .icon-outer {
                width: 20px;
                border-radius: 4px;
                height: 20px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .text {
                color: $fill_text_primary;
                font-family: $_font;
                font-size: 13px;
            }
        }

    }

    .content {
        width: 100%;
        height: 100%;
        background: $background_solidBackground_tertiary;
    }
}
</style>
