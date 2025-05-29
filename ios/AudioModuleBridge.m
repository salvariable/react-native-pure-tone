#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AudioModule, NSObject)

RCT_EXTERN_METHOD(playToneWithWave:(double)freq durationMs:(int)durationMs wave:(NSString *)wave)

@end
