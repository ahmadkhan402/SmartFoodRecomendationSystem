import { SliderBox } from "react-native-image-slider-box";

export default function Slider() {
  const Image = [
    "https://muslimhands.org.uk/_ui/images/69835fb6c3bc.jpg",
    "https://i.pinimg.com/736x/8d/9a/8a/8d9a8ac3e69cd355b7a8f26c5be12a20--hadith-quotes-daily-reminder.jpg",
    "https://pbs.twimg.com/media/DtxIjIXXgAAPSM7.jpg:large",
    "https://scontent.fisb10-1.fna.fbcdn.net/v/t39.30808-6/308667836_5675906925764429_3230093697403316482_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2c4854&_nc_ohc=ibJAfIKN7mgAX-2eLSg&_nc_ht=scontent.fisb10-1.fna&oh=00_AfBGzksRbdc8yFNUEwybZDPobhlkr4gGQtSiFgnLupkwxQ&oe=642A1DD8",

  ]
  return (
    <SliderBox
      images={Image}
      sliderBoxHeight={200}
      onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      dotColor="#4db5ff"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={40}
      autoplay
      circleLoop
      resizeMethod={'resize'}
      resizeMode={'cover'}
      paginationBoxStyle={{
        position: "absolute",
        bottom: 0,
        padding: 0,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 10
      }}
      dotStyle={{
        width: 13,
        height: 13,
        borderRadius: 5,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
        backgroundColor: "rgba(128, 128, 128, 0.92)"
      }}
      ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
      imageLoadingColor="#2c2c6c"

    />
  )
}



