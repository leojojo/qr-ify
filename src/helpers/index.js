import Vue from "vue";
import { format, parseISO } from "date-fns";

Vue.filter("MDhm", value => {
  if (!value) return "";
  return format( parseISO(value), "MM/dd hh:mm" );
});
