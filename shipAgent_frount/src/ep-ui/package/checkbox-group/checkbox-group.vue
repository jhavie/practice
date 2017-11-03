<template>
    <div class="ep-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    import emitter from './../../src/mixins/emitter';

    function hasItem(arr, item) {
        let ret = -1;

        arr.every((value, index) => {
            if (value === item) {
                ret = index;
                return false;
            }
            return true;
        });

        return ret;
    }

    function getIndex(arr, originArr) {
        let ret = [];
        arr.forEach((value, $i) => {
            originArr.every(($value, $ii) => {

                if ($value === value) {
                    ret.push($ii);
                    return false;
                }
                return true;
            });
        });

        return ret;
    }


    export default {

        name: 'EpCheckboxGroup',

        mixins: [emitter],

        props: {
            value: [Array],
        }
    }
</script>