/**
 * Если в стеке нет экрана «назад», ведём в указанный экран (обычно разделы алгебры).
 */
export function safeBackTo(navigation, fallbackScreen, fallbackParams) {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else if (fallbackParams != null) {
    navigation.navigate(fallbackScreen, fallbackParams);
  } else {
    navigation.navigate(fallbackScreen);
  }
}
