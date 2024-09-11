<?php

declare(strict_types=1);

namespace Tests\PhpUnit\Project\CatrobatFile;

use App\Project\CatrobatFile\DescriptionValidatorEventSubscriber;
use App\Project\CatrobatFile\ExtractedCatrobatFile;
use App\Project\CatrobatFile\InvalidCatrobatFileException;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

/**
 * @internal
 */
#[CoversClass(DescriptionValidatorEventSubscriber::class)]
class DescriptionValidatorEventSubscriberTest extends TestCase
{
  private DescriptionValidatorEventSubscriber $description_validator;

  #[\Override]
  protected function setUp(): void
  {
    $this->description_validator = new DescriptionValidatorEventSubscriber();
  }

  public function testInitialization(): void
  {
    $this->assertInstanceOf(DescriptionValidatorEventSubscriber::class, $this->description_validator);
  }

  /**
   * @throws Exception
   */
  public function testThrowsAnExceptionIfTheDescriptionIsTooLong(): void
  {
    $file = $this->createMock(ExtractedCatrobatFile::class);
    $description = str_pad('a', 10_001, 'a');
    $file->expects($this->atLeastOnce())->method('getDescription')->willReturn($description);
    $this->expectException(InvalidCatrobatFileException::class);
    $this->description_validator->validate($file);
  }

  /**
   * @throws Exception
   */
  public function testThrowsNothingIfANormalDescriptionIsValidated(): void
  {
    $file = $this->createMock(ExtractedCatrobatFile::class);
    $file->expects($this->atLeastOnce())->method('getDescription')->willReturn('Hello Text.');
    $this->description_validator->validate($file);
  }
}
