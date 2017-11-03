<template>
    <transition name="ep-message-fade">
        <div class="ep-message" 
            :class="messColor" 
            :style="{ top: top }"
            v-show="visible"
            @mouseleave="startTimer"
            @mouseenter="clearTimer">
            <i class="ep-message--icon" :class="messType"></i>
            <div class="ep-message--group">
                <p>{{ message }}</p>
                <i v-if="hasClose" 
                    class="ep-message--insideicon ion-close-round" 
                    @click="close"></i>
            </div>
        </div>
    </transition>
</template>
<script>
    import destory from "./../../src/mixins/destory";
    const DEFAULT_ICON = {
        'info': 'information-circled',
        'success': 'checkmark-circled',
        'warning': 'alert-circled',
        'danger': 'close-circled'
    }

    export default {
        name: 'EpMessage',

        mixins: [destory],

        computed: {
            messType () {
                return `ion-${DEFAULT_ICON[this.type]}`
            },
            messColor () {
                return `ep-message--${this.type}`
            }
        },

        data () {
            return {
                direction: 3000,
                visible: false,
                type: 'info',
                message: '',
                top: null,
                callback: null,
                timer: null,
                closed: false,
                hasClose: false
            }
        },

        methods: {
            //callback为用户规定的的回调函数
            close() {
                this.closed = true;
                if (typeof this.callback === 'function') {
                    this.callback(this);
                }
            },
            startTimer () {
                if (this.direction > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                          this.close();
                        }
                    }, this.direction);
                }
            },
            clearTimer () {
                clearTimeout(this.timer);
            }
        },

        mounted() {
            this.startTimer();
        }
    }
</script>