// timezone helpers

const getBrowserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getCurrentTimezone = () => {
  const browserTimezone = getBrowserTimezone();
  const timezone = TIMEZONES[browserTimezone as keyof typeof TIMEZONES] ?? "UTC";
  return timezone;
};

// Not a complete list, but a good start
export const TIMEZONES = {
  "Pacific/Midway": "(GMT-11:00) Midway Island, Samoa",
  "Pacific/Honolulu": "(GMT-10:00) Hawaii",
  "America/Juneau": "(GMT-9:00) Alaska",
  "America/Tijuana": "(GMT-8:00) Tijuana",
  "America/Los_Angeles": "(GMT-8:00) Pacific Time",
  "America/Boise": "(GMT-7:00) Mountain Time",
  "America/Dawson": "(GMT-7:00) Dawson, Yukon",
  "America/Phoenix": "(GMT-7:00) Arizona",
  "America/Chihuahua": "(GMT-6:00) Chihuahua, La Paz, Mazatlan",
  "America/Chicago": "(GMT-6:00) Central Time",
  "America/Regina": "(GMT-6:00) Saskatchewan",
  "America/Mexico_City": "(GMT-6:00) Guadalajara, Mexico City, Monterrey",
  "America/Belize": "(GMT-6:00) Central America",
  "America/Detroit": "(GMT-5:00) Eastern Time",
  "America/Bogota": "(GMT-5:00) Bogota, Lima, Quito",
  "America/Lima": "(GMT-5:00) Pittsburgh",
  "America/Caracas": "(GMT-4:00) Caracas, La Paz",
  "America/St_Johns": "(GMT-3:30) Newfoundland and Labrador",
  "America/Santiago": "(GMT-3:00) Santiago",
  "America/Sao_Paulo": "(GMT-3:00) Brasilia",
  "America/Montevideo": "(GMT-3:00) Montevideo",
  "America/Argentina/Buenos_Aires": "(GMT-3:00) Buenos Aires, Georgetown",
  "America/Godthab": "(GMT-3:00) Greenland",
  "Atlantic/Azores": "(GMT-1:00) Azores",
  "Atlantic/Cape_Verde": "(GMT-1:00) Cape Verde Islands",
  UTC: "(GMT+0:00) UTC",
  "Europe/London": "(GMT+0:00) Edinburgh, London",
  "Europe/Dublin": "(GMT+0:00) Dublin",
  "Europe/Lisbon": "(GMT+0:00) Lisbon",
  "Atlantic/Canary": "(GMT+0:00) Canary Islands",
  "Africa/Casablanca": "(GMT+1:00) Casablanca, Monrovia",
  "Europe/Belgrade": "(GMT+1:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
  "Europe/Sarajevo": "(GMT+1:00) Sarajevo, Skopje, Warsaw, Zagreb",
  "Europe/Brussels": "(GMT+1:00) Brussels, Copenhagen, Madrid, Paris",
  "Europe/Amsterdam": "(GMT+1:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
  "Africa/Algiers": "(GMT+1:00) West Central Africa",
  "Europe/Berlin": "(GMT+1:00) Frankfurt",
  "Europe/Bucharest": "(GMT+2:00) Bucharest",
  "Africa/Cairo": "(GMT+2:00) Cairo",
  "Europe/Helsinki": "(GMT+2:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
  "Europe/Athens": "(GMT+2:00) Athens",
  "Asia/Jerusalem": "(GMT+2:00) Jerusalem",
  "Africa/Harare": "(GMT+2:00) Harare, Pretoria",
  "Europe/Moscow": "(GMT+3:00) Istanbul, Minsk, Moscow, St. Petersburg, Volgograd",
  "Asia/Kuwait": "(GMT+3:00) Kuwait, Riyadh",
  "Africa/Nairobi": "(GMT+3:00) Nairobi",
  "Asia/Baghdad": "(GMT+3:00) Baghdad",
  "Asia/Tehran": "(GMT+3:30) Tehran",
  "Asia/Dubai": "(GMT+4:00) Abu Dhabi, Muscat",
  "Asia/Baku": "(GMT+4:00) Baku, Tbilisi, Yerevan",
  "Asia/Kabul": "(GMT+4:30) Kabul",
  "Asia/Yekaterinburg": "(GMT+5:00) Ekaterinburg",
  "Asia/Karachi": "(GMT+5:00) Islamabad, Karachi, Tashkent",
  "Asia/Kolkata": "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
  "Asia/Colombo": "(GMT+5:30) Sri Jayawardenepura",
  "Asia/Kathmandu": "(GMT+5:45) Kathmandu",
  "Asia/Dhaka": "(GMT+6:00) Astana, Dhaka",
  "Asia/Almaty": "(GMT+6:00) Almaty, Novosibirsk",
  "Asia/Rangoon": "(GMT+6:30) Yangon Rangoon",
  "Asia/Bangkok": "(GMT+7:00) Bangkok, Hanoi, Jakarta",
  "Asia/Krasnoyarsk": "(GMT+7:00) Krasnoyarsk",
  "Asia/Shanghai": "(GMT+8:00) Beijing, Chongqing, Hong Kong SAR, Urumqi",
  "Asia/Kuala_Lumpur": "(GMT+8:00) Kuala Lumpur, Singapore",
  "Asia/Taipei": "(GMT+8:00) Taipei",
  "Australia/Perth": "(GMT+8:00) Perth",
  "Asia/Irkutsk": "(GMT+8:00) Irkutsk, Ulaanbaatar",
  "Asia/Seoul": "(GMT+9:00) Seoul",
  "Asia/Tokyo": "(GMT+9:00) Osaka, Sapporo, Tokyo",
  "Asia/Yakutsk": "(GMT+9:00) Yakutsk",
  "Australia/Darwin": "(GMT+9:30) Darwin",
  "Australia/Brisbane": "(GMT+10:00) Brisbane",
  "Asia/Vladivostok": "(GMT+10:00) Vladivostok",
  "Pacific/Guam": "(GMT+10:00) Guam, Port Moresby",
  "Australia/Adelaide": "(GMT+10:30) Adelaide",
  "Australia/Sydney": "(GMT+11:00) Canberra, Melbourne, Sydney",
  "Australia/Hobart": "(GMT+11:00) Hobart",
  "Asia/Magadan": "(GMT+11:00) Magadan, Solomon Islands, New Caledonia",
  "Asia/Kamchatka": "(GMT+12:00) Kamchatka, Marshall Islands",
  "Pacific/Fiji": "(GMT+12:00) Fiji Islands",
  "Pacific/Auckland": "(GMT+13:00) Auckland, Wellington",
  "Pacific/Tongatapu": "(GMT+13:00) Nuku'alofa",
};
