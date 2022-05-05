import moment from "moment";
import "moment/locale/vi";

export default (ctx, inject) => {
  moment.locale("vi");

  ctx.$moment = moment;
  inject("moment", moment);
};
