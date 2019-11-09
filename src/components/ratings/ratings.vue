<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="rating-left">
        <h2 class="score">{{seller.score}}</h2>
        <div class="upscore">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="rating-right">
        <div class="score-warpper">
          <span class="Score">服务态度</span>
          <star :size="36" :score="seller.serviceScore" class="star"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-warpper">
          <span class="Score">服务态度</span>
          <star :size="36" :score="seller.foodScore" class="star"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="time">
          <span class="text">送达时间</span>
          <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <iterval-line></iterval-line>
    <rating-select
      v-bind:desc="desc"
      v-bind:ratings="ratings"
      v-bind:selectType="selectType"
      v-bind:onlyContent="onlyContent"
      v-on:changeType="changeType"
      v-on:changeOnly="changeOnly"
    ></rating-select>
    <div class="ratings-list">
      <ul v-show="ratings || ratings.length>0">
        <li
          class="rating"
          v-for="(rating,index) in ratings"
          v-bind:key="index"
          v-show="handleShow(rating.rateType,rating.text)"
        >
          <div class="avatar">
            <img :src="rating.avatar" width="28px" height="28px" />
          </div>
          <div class="avatar-detail">
            <span class="username">{{rating.username}}</span>
            <div class="star-info">
              <star class="star" :size="24" :score="rating.score"></star>
              <span class="time">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <span class="text">{{rating.text}}</span>
            <div v-show="rating.recommend && rating.recommend.length>0" class="recommend-list">
              <span
                class="icon-thumb"
                :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"
              ></span>
              <ul>
                <li
                  class="recommend"
                  v-for="(item,index) in rating.recommend"
                  v-bind:key="index"
                >{{item}}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from "../star/star";
import ItervalLine from "../line/line";
import axios from "axios";
import RatingSelect from "../ratingselect/ratingSelect";
const POSITIVE = 0;
const NAGITIVE = 1;
const ALL = 2;
export default {
  name: "Ratings",
  data() {
    return {
      ratings: [],
      desc: {
        all: "全部",
        positive: "满意",
        nagitive: "不满意"
      },
      selectType: ALL,
      onlyContent: true
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    ItervalLine,
    RatingSelect
  },
  created() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      axios.get("/api/ratings.json").then(this.getAllDataSucc);
    },
    getAllDataSucc(res) {
      const data = res.data;
      this.ratings = data.ratings;
    },
    changeType(type) {
      this.selectType = type;
    },
    changeOnly() {
      this.onlyContent = !this.onlyContent;
    },
    handleShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.ratings {
  position: absolute;
  top: 174px;
  width: 100%;
  overflow: hidden;

  .ratings-content {
    display: flex;
    padding: 18px 0;

    .rating-left {
      flex: 0 0 137px;
      width: 138px;
      border-right: 1px solid rgb(212, 214, 217);
      text-align: center;

      @media screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
        margin-bottom: 6px;
      }

      .upscore {
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
      }

      .rankRate {
        margin-bottom: 6px;
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .rating-right {
      flex: 1;
      padding-left: 24px;
      paading-right: 24px;
      font-size: 12px;
      line-height: 18px;

      .score-warpper {
        display: flex;

        .Score {
          margin-right: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          margin-right: 12px;
        }

        .score {
          color: rgb(255, 153, 0);
        }
      }

      .time {
        .text {
          margin-right: 12px;
        }

        .deliveryTime {
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .ratings-list {
    font-size: 0;

    .rating {
      padding: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      display: flex;

      .avatar {
        img {
          border-radius: 50%;
        }
      }

      .avatar-detail {
        margin-left: 12px;

        .username {
          font-size: 10px;
          color: rgb(7, 17, 27);
          line-height: 12px;
        }

        .star-info {
          display: flex;
          margin-top: 4px;
          margin-bottom: 6px;

          .star {
            margin-right: 6px;
          }

          .text {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
        }

        .text {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          margin-bottom: 8px;
        }

        .recommend-list {
          display: flex;

          .icon-thumb {
            font-size: 12px;
            margin-right: 8px;

            &.icon-thumb_up {
              color: rgb(0, 160, 220);
            }

            &.icon-thumb_down {
              color: rgb(183, 187, 191);
            }
          }

          ul {
            .recommend {
              display: inline-block;
              max-width: 54px;
              padding: 0 6px;
              margin-right: 8px;
              line-height: 16px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              font-size: 9px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>