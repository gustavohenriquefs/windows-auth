import { TestBed } from "@angular/core/testing";
import { UserImplementationRepository } from "./user-implementation.repository";

describe('UserImplementationRepository', () => {
  let repository: UserImplementationRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UserImplementationRepository]
    });
    
    repository = TestBed.inject(UserImplementationRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it(`#${UserImplementationRepository.prototype.login.name} should return an Observable`, () => {
    const result = repository.login({ email: 'test', password: 'test' });

    expect(result).toBeTruthy();
  });
});