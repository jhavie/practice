import { on, off } from "../utils/dom";

const rippleSetting = {
    middle: {
        width: '5px',
        height: '5px',
        top: '50%',
        left: '50%'
    }
}

/**
 * Material Design水波动画
 * TODO 连续点击layerY和layerX会在动画消失的瞬间定位失效，导致水波定位不准确
 * User: merjiezo
 * Date: 2017/2/27
 * Time: 上午8:36
 */
export default {

    //此方法的时候必须加上事件绑定，否则效果不起作用
    mounted() {
        if (this.rippleNeedBindEvent) {
            on(this.$el, 'mousedown', this.ripple);
        }
    },
    data() {
        return {
            tap: 'handleClick',
            rippleNeedBindEvent: true,
            rippleStyle: 'button',
            clickNow: false,
            fadeStyle: {
                top: '0px',
                left: '0px'
            }
        }
    },

    methods: {
        ripple(evt) {
            let vm = this;
            if (this.rippleNeedBindEvent === true) {
                if (evt.button === 0) {

                    const width = evt.currentTarget.clientWidth;
                    const top = evt.layerY;
                    const left = evt.layerX;
                    on(vm.$el, 'mouseup', vm.tapCallBack);
                    if (top > 0) {
                        off(vm.$el, 'mousedown', vm.ripple);
                        vm.fadeStyle = {
                            width: width / 10 * 1.5 + 'px',
                            height: width / 10 * 1.5 + 'px',
                            top: top + 'px',
                            left: left + 'px'
                        }
                    }
                } else {
                    return;
                }

            } else {
                vm.fadeStyle = rippleSetting[this.rippleStyle];
            }


            vm.clickNow = true;
            let time = setTimeout(() => {
                vm.clickNow = false;
                clearTimeout(time);
            }, 500);
            if (this.rippleNeedBindEvent) {
                on(this.$el, 'mousedown', vm.ripple);
            }
        },
        tapCallBack(evt) {
            this.$emit('click', evt);
            off(this.$el, 'mouseup', this.tapCallBack);
        }
    }
};