#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Brightness, NSObject)

RCT_EXTERN_METHOD(setBrightness:(CGFloat)brightness duration:(nonnull NSNumber *)duration)
RCT_EXTERN_METHOD(getBrightness:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setIsNeedRestoreBrightness:(BOOL)isVisible)

@end
